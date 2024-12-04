var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

let Tournament = require('../model/tournament')

function requireAuth(req,res,next){
    if(req.isAuthenticated())
    {
        return res.redirect('/login')
    }
    next();
}
/*CRUD*/
/*Read Operation --> Get route for the tournament list*/
router.get('/',async(req,res,next)=>{
    try{
        const TournamentList = await Tournament.find();
        res.render('Tournament/list',{
            title:'Tournaments', 
            displayName:req.user ? req.user.displayName:'',
            TournamentList:TournamentList
        })
    }
    catch(err){
        console.error(err)
        res.render('Tournament/list',{
            error:'Error on Server'})
    }
})
/*Create Operation --> Get route for Add tournament*/
router.get('/add',async(req,res,next)=>{
    try{
        res.render('Tournament/add',{
            title:"Add Tournament",
            displayName:req.user ? req.user.displayName:''
        });
    }
    catch(err){
        console.error(err)
        res.render('Tournament/list',{
            error:'Error on Server'})
    }
});
/*Create Operation --> Post route for processing the Add page*/
router.post('/add',async(req,res,next)=>{
    try{
        let newTournament = Tournament({
        "Name":req.body.Name,
        "Location":req.body.Location,
        "Start":req.body.Start,
        "End":req.body.End
        })
        Tournament.create(newTournament).then(()=>{
            res.redirect('/tournamentslist')
        })
    }
    catch(err){
        console.error(err)
        res.render('Tournament/list',{
            error:'Error on Server'})
    }
});
/*Update Operation --> Get route for the Edit page*/
router.get('/edit/:id',async(req,res,next)=>{
    try{
        const id = req.params.id;
        const TournamentToEdit = await Tournament.findById(id);
        res.render('Tournament/edit',
            {
                title:'Edit Tournament',
                displayName:req.user ? req.user.displayName:'',
                Tournament:TournamentToEdit
            }
        )
    }
    catch(err){
        console.error(err)
        next(err);
    }
});
/*Update Operation --> Post route for processing Edit page*/
router.post('/edit/:id',async(req,res,next)=>{
    try{
        let id = req.params.id;
        let updatedTournament = Tournament({
        "_id":id,
        "Name":req.body.Name,
        "Location":req.body.Location,
        "Start":req.body.Start,
        "End":req.body.End
        })
        Tournament.findByIdAndUpdate(id,updatedTournament).then(()=>{
            res.redirect('/tournamentslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Tournament/list',{
            error:'Error on server'
        })
    }
});
/*Delete Operation --> Get route for the Deletion*/
router.get('/delete/:id',(req,res,next)=>{
    try{
        let id=req.params.id;
        Tournament.deleteOne({_id:id}).then(()=>{
            res.redirect('/tournamentslist')
        })
    }
    catch(err){
        console.error(err);
        res.render('Tournament/list',{
            error:'Error on server'
        })
    }
});
module.exports = router;
