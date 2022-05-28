const cors = require('cors');
const translatte = require('translatte');
const app = require('express')();
const translate = require('translatte');
app.use(cors({origin: '*'}));

app.get('/', (req, res) => {
    res.send({status: 'OK!'});
});

app.get('/langs', async(req, res) => {
    var langs = Object.keys(translatte.languages).filter(x => {
        if (typeof translatte.languages[x] == 'string'){
            return true;
        } else {
            return false;
        }
    });
    langs = langs.map(x => {
        return {code: x, name: translatte.languages[x]};
    });
    res.send({status: 'OK!', langs});
})

app.get('/translate/:language/:text', async(req, res) => {
    const {language, text} = req.params;
    translatte(text, {to: language}).then(data => {
        res.send({status: 'OK!', text: data.text});
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor aberto na porta ${process.env.PORT || 3000}`);
})