const express = require('express');
const {setupNativeMongoConnection, app, router} = require('./connection');
const { getPort } = require('./utils/getEnvs');
const PORT = getPort();

const dataRouter = require("./router/dataRouter");
require("dotenv").config();

const setupMongoDBConnection = async() => {
	const res = await setupNativeMongoConnection();
	if (res) {
		app.listen(PORT, (error) => {
			if(!error) {
				console.log('Server is Successfully Running on PORT ' + PORT);
			 } else {
				console.log('Connection error')
			 }
		})
	  } else {
		  console.log("Connection error");
	  }
}


setupMongoDBConnection();


router.route("/").get(async(req, res) => {
	res.send("Fitpage-server-release - 1.0.0")
})

app.use("/api/", dataRouter);

app.use(router);