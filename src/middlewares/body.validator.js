export const bodyValidator = (req, res, next) => {
    if(!req.body.title) return res.status(404).json({msg: 'El campo title es obligatorio'})
    if(!req.body.description) return res.status(404).json({msg: 'El campo description es obligatorio'})
    if(!req.body.code) return res.status(404).json({msg: 'El campo code es obligatorio'})
    if(!req.body.price) return res.status(404).json({msg: 'El campo price es obligatorio'})
    if(!req.body.status) return res.status(404).json({msg: 'El campo status es obligatorio'})
    if(!req.body.stock) return res.status(404).json({msg: 'El campo stock es obligatorio'})
    if(!req.body.category) return res.status(404).json({msg: 'El campo category es obligatorio'})
    next()
}