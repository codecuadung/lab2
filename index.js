//import thu vien-------------------------------------------------
const express=require('express');
const mongoose=require('mongoose');
//tao doi tuong moi cho express
const app=express();
app.set('view engine','ejs');
//ket noi voi csdl mongodb----------------------------------------------
mongoose.connect('mongodb+srv://dungptph36187:thaitus29x@cluster0.yvihmrn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Ket noi thanh cong voi mongodb")
}).catch((err)=>{
    console.error("Loi:",err);
});
//truy van csdl---------------------------------------------------
//chon csdl thao tac
const db1=mongoose.connection.useDb('db1');
//dinh nghia model cho bang du lieu
const SinhVienSchema=new mongoose.Schema({
    masv:String,
    tensv:String
},{ collection: 'sinhvien' });
//anh xa model vao bang du lieu
const SinhVien=db1.model('sinhviens',SinhVienSchema);
//tao link trieu goi tren trinh duyet (API)
app.get('/',async (req,res)=>{
    try {
        const sinhvien= await SinhVien.find();//doc du lieu tu bang sinh vien
        if(sinhvien.length>0){//neu co ton tai du lieu
            // res.json(sinhvien);//api tra ve ket qua
            res.render('sinhvien.ejs',{sinhvien:sinhvien});//api tra ve ket qua
        }
        else
        {
            res.status(404).json({error:"khong co sinh vien"});
        }
    } catch (error) {
        console.error("Loi doc du lieu: ");
        res.status(500).json({error: "Doc du lieu loi"});
    }
});
//khoi chay may chu------------------------------------------------------------
const PORT=process.env.PORT|| 5000;
app.listen(PORT,()=>{
console.log('server dang chay o cong 5000');
});
module.exports=app;