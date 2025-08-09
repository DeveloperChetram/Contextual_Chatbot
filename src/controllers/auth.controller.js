const registerGetController = async (req, res) => {
    res.render('register');
}

const registerPostController = async (req, res)=>{
const {username, email, password}= req.body;

}

module.exports = {registerGetController, registerPostController};