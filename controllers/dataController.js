const {client} = require('../connection');
const {ObjectId}= require('mongodb');
const BaseManager = require('../db/manager.js');
const { getCollection } = require('../utils/getEnvs.js');

class DataController {
    constructor() {}
  
	async getAll(req, res) {
      let response;
	  try {
		const baseManager = new BaseManager(req.db, getCollection())
		response = await baseManager.getAll();
		return res.status(200).send({data: response})
	  } catch(err) {
		console.log(err)
        return res.status(500).send(err);
	  }
    }

	async getById(req, res) {
	  const id = req.params.id;
	  const objectId = new ObjectId(id)
	  let response;
	  try {
		const baseManager = new BaseManager(req.db, getCollection())
		response = await baseManager.getOne({_id:objectId});
		console.log("result successfully fetched")
		if(response.length>0) {
		 return res.status(200).send({data: response})
		} else {
	     return res.status(404).send({"error":"Id not found"})		
		}
	  } catch(err) {
		console.log(err)
        return res.status(500).send("Contact system administrator");
	  }
	}
}

module.exports = DataController;