const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const Paciente = require('../../models/mock/pacientes.models.js');

// Mapa para almacenar tokens temporales de autenticación
const tokensPendientes = new Map();

const showLoginForm = (req, res) => {
  res.render('auth/login', { error: null });
};

const login = async (req, res) => {
  const { email } = req.body;
  let { password } = req.body;
  password = password ? password.trim() : '';

  try {
    const paciente = await Paciente.findByEmail(email);
    if (!paciente) {
      return res.render('auth/login', { error: 'Credenciales incorrectas' });
    }

    const match = await bcrypt.compare(password, paciente.password);
    console.log('Contraseña ingresada:', `"${password}"`);
    console.log('Contraseña guardada:', paciente.password);
    console.log('¿Password match?', match);

    if (match) {
      req.session.user = {
        id: paciente.id,
        nombre: paciente.nombre,
        email: paciente.email
      };
      return res.redirect('/');
    } else {
      return res.render('auth/login', { error: 'Credenciales incorrectas' });
    }
  } catch (error) {
    return res.render('auth/login', { error: 'Credenciales incorrectas' });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};

const showRegisterForm = (req, res) => {
  res.render('auth/register', { error: null });
};

const register = async (req, res) => {
  const { dni, nombre, apellido, email, password } = req.body;

  if (!dni || !nombre || !apellido || !email || !password) {
    return res.render('auth/register', { error: 'Faltan campos obligatorios' });
  }

  try {
    await Paciente.findByEmail(email);
    return res.render('auth/register', { error: 'El email ya está registrado' });
  } catch (e) {
    // OK, no existe todavía
  }

  const token = uuidv4();
  tokensPendientes.set(token, { dni, nombre, apellido, email, password });

  console.log(`🟢 Token generado para ${email}: ${token}`);

  return res.redirect(`/verificar-token?email=${encodeURIComponent(email)}`);
};

const showTokenVerificationForm = (req, res) => {
  const email = req.query.email || '';
  res.render('auth/verify-token', { email, error: null });
};

const verifyToken = async (req, res) => {
  const { token, email } = req.body;

  const datosPendientes = tokensPendientes.get(token);

  if (!datosPendientes || datosPendientes.email !== email) {
    return res.render('auth/verify-token', { email, error: 'Token inválido o expirado.' });
  }

  try {
    console.log('Registrando paciente con contraseña:', datosPendientes.password);

    const nuevoPaciente = {
      dni: datosPendientes.dni,
      nombre: datosPendientes.nombre,
      apellido: datosPendientes.apellido,
      email: datosPendientes.email,
      password: datosPendientes.password // 👉 mandamos la contraseña original
    };

    console.log("📤 Contraseña que se envía al modelo:", nuevoPaciente.password);

    await Paciente.create(nuevoPaciente);
    tokensPendientes.delete(token);
    res.redirect('/login');

  } catch (error) {
    res.render('auth/verify-token', { email, error: 'Error al crear paciente.' });
  }
};


module.exports = {
  showLoginForm,
  login,
  logout,
  showRegisterForm,
  register,
  showTokenVerificationForm,
  verifyToken
};
