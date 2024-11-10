var express = require('express');
var router = express.Router();
let Tournament = require('../model/tournament')
/*CRUD*/
/*Read Operation --> Get route for the tournament list*/
router.get('/',async(req,res,next)=>{
    try{
        const TournamentList = await Tournament.find();
        res.render('Tournament/list',{
            title:'Tournaments', 
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
            title:"Add Tournament"
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
        "Start Date":req.body.StartDate,
        "End Date":req.body.EndDate
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
            "Start Date":req.body.StartDate,
            "End Date":req.body.EndDate
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