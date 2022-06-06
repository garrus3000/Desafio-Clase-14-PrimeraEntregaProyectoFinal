const isItAdmin = (req, res, next) => {
    const admin = true;
    admin === true
        ? next()
        : res.status(401)
              .send({
				error: -1,
				descripcion: `ruta ${req.originalUrl} y metodo ${req.method} no autorizada`,
			});
};

export default isItAdmin;
