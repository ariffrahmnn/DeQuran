import express from 'express';
import axios from 'axios';

const app = express();
const port = 3000;
const API_URL = 'https://equran.id/api/v2/surat';

app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const request = await axios.get(API_URL)
        const surahList = request.data.data;
    
        const surahDatas = surahList.map(item => ({
            title: item.namaLatin,
            translate: item.arti
        }))
        res.render('index.ejs', {surahDatas: surahDatas})
    } catch (error) {
        console.error("Failed to make a request", error.message)
        res.render ('index.ejs', {surahDatas: [],
            error: error.message})
    }
})

app.listen(port, () => {
    console.log(`This app is running on port ${port}`);
})