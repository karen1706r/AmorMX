const categorias_inventario = require('../models').categorias_inventario_model;
const categorias_platos = require('../models').categorias_platos_model;
const facturas = require('../models').facturas_model;
const ingredientes = require('../models').ingredientes_model;
const inventario = require('../models').inventario_model;
const mesas = require('../models').mesas_model;
const pedidos_por_mesa = require('../models').pedidos_por_mesa_model;
const pedidos = require('../models').pedidos_model;
const platos_ingredientes = require('../models').platos_ingredientes_model;
const platos = require('../models').platos_model;
const sesiones_usuarios = require('../models').sesiones_usuarios_model;
const tipos_de_usuario = require('../models').tipos_de_usuario_model;
const usuarios = require('../models').usuarios_model;


const { Sequelize, Op } = require("sequelize");
const db = require('../models');


module.exports = {
    list(req, res) {
        return inventario
            .findAll({})
            .then((inventario) => res.status(200).send(inventario))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        console.log(req.params.id);
        return inventario
            .findByPk(req.params.id)
            .then((inventario) => {
                console.log(inventario);
                if (!inventario) {
                    return res.status(404).send({
                        message: 'inventario Not Found',
                    });
                }
                return res.status(200).send(inventario);
            })
            .catch((error) =>
                res.status(400).send(error));
    },



    add(req, res) {
        return inventario
            .create({
                cantidad: req.body.cantidad,
                fecha_ingreso: req.body.fecha_ingreso,
                fecha_vencimiento: req.body.fecha_vencimiento,
                id_categoria: req.body.id_categoria,
                id_ingrediente: req.body.id_ingrediente

            })
            .then((inventario) => res.status(201).send(inventario))
            .catch((error) => res.status(400).send(error));
    },

    update(req, res) {
        return inventario
            .findByPk(req.params.id)
            .then(inventario => {
                if (!inventario) {
                    return res.status(404).send({
                        message: 'inventario Not Found',
                    });
                }
                return inventario
                    .update({
                        cantidad: req.body.cantidad || inventario.cantidad,
                        fecha_ingreso: req.body.fecha_ingreso || inventario.fecha_ingreso,
                        fecha_vencimiento: req.body.fecha_vencimiento || inventario.fecha_vencimiento,
                        id_categoria: req.body.id_categoria || inventario.id_categoria,
                        id_ingrediente: req.body.id_ingrediente || inventario.id_ingrediente

                    })
                    .then(() => res.status(200).send(inventario))
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    delete(req, res) {
        return inventario
            .findByPk(req.params.id)
            .then(inventario => {
                if (!inventario) {
                    return res.status(400).send({
                        message: 'inventario Not Found',
                    });
                }
                return inventario
                    .destroy()
                    .then(() => res.status(204).send())
                    .catch((error) => res.status(400).send(error));
            })
            .catch((error) => res.status(400).send(error));
    },

    listFull(req, res) {
        return inventario.findAll({
            attributes: ['cantidad', 'fecha_ingreso', 'fecha_vencimiento'],
            include: [
                {
                    model: categorias_inventario,
                    attributes: ['nombre_categoria'],
                },
                {
                    model: ingredientes,
                    attributes: ['nombre', 'unidad'],
                    include: [
                        {
                            model: platos_ingredientes,
                            attributes: ['cantidad']
                        }
                    ]
                },
                {
                    model: pedidos_por_mesa,
                    attributes: ['cantidad', 'comentarios', 'fecha_hora'],
                    include: [
                        {
                            model: platos,
                            attributes: ['nombre', 'precio', 'ruta'],
                            include: [
                                {
                                    model: platos,
                                    attributes: ['nombre_categoria']
                                }
                            ]
                        },
                        {
                            model: pedidos,
                            attributes: ['fecha', 'estado_pedido'],
                            include: [
                                {
                                    model: usuarios,
                                    attributes: ['nombre_completo', 'cedula', 'contrasena', 'correo', 'telefono', 'direccion'],
                                    include: [
                                        {
                                            model: tipos_de_usuario,
                                            attributes: ['nombre_tipo'],
                                            include: [
                                                {
                                                    model: sesiones_usuarios,
                                                    attributes: ['fecha', 'hora'],
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    model: mesas,
                                    attributes: ['numero', 'estado']
                                }
                            ]
                        },
                        {
                            model: facturas,
                            attributes: ['numero', 'total', 'fecha'],
                        }
                    ]
                }


            ]

        })
            .then((inventario) => {
                console.log("Inventario encontrada:", inventario);
                res.status(200).send(inventario);
            })
            .catch((error) => {
                console.error("Error al buscar inventario:", error);
                res.status(400).send(error);
            });
    },


    listEnableFull(req, res) {
        return inventario.findAll({
            attributes: ['cantidad', 'fecha_ingreso', 'fecha_vencimiento'],
            include: [
                {
                    model: categorias_inventario,
                    attributes: ['nombre']
                },
                {
                    model: ingredientes,
                    attributes: ['nombre', 'unidad'],
                    include: [
                        {
                            model: platos_ingredientes,
                            attributes: ['cantidad']
                        }
                    ]
                },
                {
                    model: pedidos_por_mesa,
                    attributes: ['cantidad', 'comentarios', 'fecha_hora'],
                    include: [
                        {
                            model: platos,
                            attributes: ['nombre', 'precio', 'ruta'],
                            include: [
                                {
                                    model: categorias_platos,
                                    attributes: ['nombre_categoria']
                                }
                            ]
                        },
                        {
                            model: pedidos,
                            attributes: ['fecha', 'estado_pedido'],
                            include: [
                                {
                                    model: usuarios,
                                    attributes: ['nombre_completo', 'cedula', 'contrasena', 'correo', 'telefono', 'direccion'],
                                    include: [
                                        {
                                            model: tipos_de_usuario,
                                            attributes: ['nombre_tipo'],
                                            include: [
                                                {
                                                    model: sesiones_usuarios,
                                                    attributes: ['fecha', 'hora'],
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    model: mesas,
                                    attributes: ['numero', 'estado']
                                }
                            ]
                        },
                        {
                            model: facturas,
                            attributes: ['numero', 'total', 'fecha'],
                        }
                    ]
                }


            ],
            where: {
                cantidad: {
                    [Sequelize.Op.not]: null
                }
            },
            order: [
                ['cantidad', 'ASC']
            ]
        })
            .then((inventario) => res.status(200).send(inventario))
            .catch((error) => { res.status(400).send(error); });
    },

    getSQL(req, res) {
        return db.sequelize.query("SELECT * FROM public.inventario")
            .then((result) => {
                console.log(result);
                if (!result) {
                    return res.status(404).send({
                        message: 'result Not Found',
                    });
                }
                return res.status(200).send(result[0]);
            })
            .catch((error) =>
                res.status(400).send(error));
    },

};