const NotFoundException = require('../exceptions/not_found.exceptions');
const {
  Optional, Marital, Sex, Country, Profile,
} = require('../models');

const MARITAL_SEX_COUNTRY = [Marital, Sex, Country];

/**
 * Encontrar un OPCIONAL por su id.
 * Si no existe, lanza una excepcion NotFoundException.
 */
async function checkAndGetOptionalById(id) {
  const optional = await Optional.findByPk(id, {
    include: MARITAL_SEX_COUNTRY,
  });

  if (!optional) {
    throw new NotFoundException('Optionals not found');
  }

  return optional;
}

/**
 * Develve una lista de OPCIONALES,
 *
 * En caso de no encontrar opcionales lanza una
 * excepción NotFoundException.
 */
async function fetchOptionals() {
  const optionals = await Optional.findAll({ include: MARITAL_SEX_COUNTRY });

  if (!optionals) {
    throw new NotFoundException('Optionals not found');
  }

  return optionals;
}

/**
 * Obener un OPCIONAL por su id.
 */
async function fetchOptionalById(id) {
  const optinal = await Optional.findByPk(id, { include: MARITAL_SEX_COUNTRY });

  if (!optinal) {
    throw new NotFoundException(`Optional with id ${id} not found`);
  }

  return optinal;
}

/**
 * Guardar los datos de un nuevo OPTCIONAL.
 */
async function saveNewOptionalData(data) {
  return Optional.create(data);
}

/**
 * Actualizar los datos de un OPCIONAL.
 */
async function saveOptionalData(id, data) {
  const optional = await checkAndGetOptionalById(id);

  return optional.update(data);
}

/**
 * Eliminar un OPCIONAL.
 */
async function deleteOptionalData(id) {
  const optional = await checkAndGetOptionalById(id);

  return optional.destroy();
}

/**
 * Obener un OPCIONAL por su id.
 */
async function fetchOptionalsByUserId(userId) {
  const PROFILE = [
    {
      model: Profile,
      attributes: [],
      where: {
        user_id: userId,
      },
    },
  ];

  const optinal = await Optional.findAll({
    include: [...PROFILE, ...MARITAL_SEX_COUNTRY],
    distinct: true,
  });

  if (!optinal) {
    throw new NotFoundException(`Optional with user_id ${userId} not found`);
  }

  return optinal;
}

module.exports = {
  fetchOptionals,
  fetchOptionalById,
  saveNewOptionalData,
  saveOptionalData,
  deleteOptionalData,
  fetchOptionalsByUserId,
};
