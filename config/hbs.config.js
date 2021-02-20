const hbs = require('hbs');
const path = require('path');
hbs.registerPartials(path.join(__dirname, '../views/partials'));

/** Nav Helpers */
hbs.registerHelper('active', (currentPath, hint, options) => {
  const args = options.hash;
  if (args.exact) {
    return currentPath === hint ? 'active' : '';
  } else {
    return currentPath.includes(hint) ? 'active' : '';
  }
});

/** Form Helpers */
hbs.registerHelper('isInvalid', (error) => {
  return error ? 'is-invalid' : ''
});
hbs.registerHelper('formError', (error) => {
  return error ? new hbs.SafeString(`<div class="invalid-feedback">${error}</div>`) : ''
});

/** Content Helpers */
hbs.registerHelper('limitChars', (maxChars, options) => {
  return options.fn().slice(0, maxChars) + '...';
})

hbs.registerHelper('itsMe', (userId, userOfferId, options) => {
  if (userOfferId && userId == userOfferId) { /* objeto == string */
    return options.fn() /*Ejecuta lo q está dentro del itsme*/ ;
  } else {
    return options.inverse();
  }
});

hbs.registerHelper('dealOwner', (ownerId, userId, options) => {
  if (ownerId == userId) { 
    return options.fn()
  } else {
    return options.inverse();
  }
});

hbs.registerHelper('isWaiting', (status, options) => {
  if (status == 'Pendiente') { 
    return options.fn()
  } else {
    return options.inverse();
  }
});

hbs.registerHelper('isAccepted', (status, options) => {
  if (status == 'Aceptado') { 
    return options.fn()
  } else {
    return options.inverse();
  }
});

hbs.registerHelper('isEnded', (status, options) => {
  if (status == 'Finalizado') { 
    return options.fn()
  } else {
    return options.inverse();
  }
});

hbs.registerHelper('isCancelled', (status, options) => {
  if (status == 'Cancelado') { 
    return options.fn()
  } else {
    return options.inverse();
  }
});
