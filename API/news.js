var express = require('express');
var router = express.Router();
let {MongoClient, uri} =require("../MongoDB.js")

router.get('/categories', function(req, res, next) {
  const datacategory = async() => {
    const client = new MongoClient(uri);
    const database = client.db('bignews');
    const crawlerdata = database.collection('crawlerdata');
    let data 
    try {
      const options = {
        sort: { date: -1 },
        projection: { _id: 0, cat:1 },
      };
      result = await crawlerdata.find({}, options);
      let  category =[]
      await result.forEach((el, index) =>{
        for (const item of el.cat){
            if (!category.includes(item)){
                category.push(item)
            }
        }
      })
      data = category
    }
    catch(err) {
        data = err.name
    }
    finally {
      await client.close();
      return {data}
  }}
  datacategory().then((result) => {
    res.send(result)
})});

router.get('/count', function(req, res, next) {
    let keyword = req.query.keyword
    let Author = req.query.author
    let query={}
    if(keyword){
      query = {$or:[
      {cat:keyword},
      {title:{'$regex':keyword}}
    ]}
  }else if(Author){
    query = {author:Author}
  }
    const datacount = async() => {
    const client = new MongoClient(uri);
    const database = client.db('bignews');
    const crawlerdata = database.collection('crawlerdata');
    let data 
    try {
    //   let query = keyword? {$or:[
    //     {cat:keyword},
    //     {title:{'$regex':keyword}}
    // ]}: {} 
      count = await crawlerdata.countDocuments(query);
      data = {count}
    }
    catch(err) {
        data = err
    }
    finally {
      await client.close();
      return {data}
    }}
    datacount().then((result) => {
      res.send(result)
  })});

  // router.get('/author/count', function(req, res, next) {
  //   let Author = req.query.author
  //   const datacount = async() => {
  //   const client = new MongoClient(uri);
  //   const database = client.db('bignews');
  //   const crawlerdata = database.collection('crawlerdata');
  //   let data 
  //   try {
  //     let query = {author:Author}
  //     count = await crawlerdata.countDocuments(query);
  //     data = {count}
  //   }
  //   catch(err) {
  //       data = err
  //   }
  //   finally {
  //     await client.close();
  //     return {data}
  //   }}
  //   datacount().then((result) => {
  //     res.send(result)
  // })});


router.get('/', function(req, res, next) {
    let page = parseInt(req.query.page)
    let keyword = req.query.keyword
    const getdata = async(page, keyword) => {
      const client = new MongoClient(uri);
      const database = client.db('bignews');
      const crawlerdata = database.collection('crawlerdata');
      try {
        let data = []
        let SkipNumber = (page-1)*10
        let query = keyword? {$or:[
            {cat:keyword},
            {title:{'$regex':keyword}}
        ]}: {}    
        const options = {
          sort: { date: -1 , title:1},
          projection: { _id: 0, content:0 },
          limit: 10,
          skip: SkipNumber
        };
        cursor = await crawlerdata.find(query, options);
        await cursor.forEach((el, index) => {
            data.push(el)
        })
        let NextPage = data.length <10 ? null : page+1
        result = {data, NextPage}
      }
      catch(err) {
        result = {error: true, message: err.name};
      }
      finally {
        await client.close();
        return result
    }}
    getdata(page, keyword).then((result) => {
      res.send(result)
  })
});

router.get('/author', function(req, res, next) {
  let page = parseInt(req.query.page)
  let Author = req.query.author
  const getdata = async(page, Author) => {
    const client = new MongoClient(uri);
    const database = client.db('bignews');
    const crawlerdata = database.collection('crawlerdata');
    try {
      let data = []
      let SkipNumber = (page-1)*10
      let query = {author:Author}
   
      const options = {
        sort: { date: -1 , title:1},
        projection: { _id: 0, content:0 },
        limit: 10,
        skip: SkipNumber
      };
      cursor = await crawlerdata.find(query, options);
      await cursor.forEach((el, index) => {
          data.push(el)  
      })
      let NextPage = data.length <10 ? null : page+1
      result = {data, NextPage}
    }
    catch(err) {
      result = {error: true, message: err.name};
    }
    finally {
      await client.close();
      return result
  }}
  getdata(page, Author).then((result) => {
    res.send(result)
})
});


router.get('/:id', function(req, res, next) {
    id =req.params.id
    const getdata = async(id) => {
      const client = new MongoClient(uri);
      const database = client.db('bignews');
      const crawlerdata = database.collection('crawlerdata');
      try {
        const query = {NewsUrl:{'$regex':id}}
        const options = {
          projection: { _id: 0},
        };
        data = await crawlerdata.findOne(query, options);
        result = {data}
      }
      catch(err) {
        result = {error: true, message: err.name};
      }
      finally {
        await client.close();
        return result
    }}
    getdata(id).then((result) => {
      res.send(result)
  })
});

module.exports = router;