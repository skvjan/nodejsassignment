const { agency } = require("../models/agency.model");
const { client } = require("../models/client.model");

const bcrypt = require("bcryptjs");
const auth = require("../middlewear/auth.js");


async function createAgency(params, callback) {
  if (!params.agency) {
    return callback({ message: "Agency Required"});
  }

  const agencyModel = agency(params.agency);

  agencyModel
    .save()
    .then((response) => {
      return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
};

async function createClient(params, callback) {
  if (!params.client) {
    return callback({ message: "Client Required"});
  }

  // const clientModel = client(params.client);
 

  // Function call
  client
  .insertMany(params.client)
  .then((response) => {
    console.log(response);
    return callback(null, response);
  }).catch((error) => {
    return callback(error);
  });  

  // clientModel
  //   .save()
  //   .then((response) => {
  //     return callback(null, response);
  //   })
  //   .catch((error) => {
  //     return callback(error);
  //   });

};

async function addClientToAgency(id, params, callback){

  client
    .findByIdAndUpdate(id, params, { useFindAndModify: false })
    .then((response) => {
      if (!response) callback("Client Id Invalid!");
      else return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });

}


async function deleteAgency(id, callback) {
  agency
    .findByIdAndRemove(id)
    .then((response) => {
      if (!response) callback("Agecny Id Invalid!");
      else return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function deleteClient(id, callback) {

  client
    .findByIdAndRemove(id)
    .then((response) => {
      if (!response) callback("Agecny Id Invalid!");
      else return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}


async function updateClient(id, params, callback) {
  
  client
    .findByIdAndUpdate(id, params, { useFindAndModify: false })
    .then((response) => {
      if (!response) callback("Client Id Invalid!");
      else return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getAgency(params, callback) {
  
  client
    .find().sort( { TotalBill: -1 } )
    .populate("AgencyId")
    .then((response) => {
      var newResponse = {};
      const obj = Object.keys(response);
      obj.forEach((key, index) => {
        newResponse[key] = {
          AgencyName: response[key]['AgencyId']['Name'],
          ClientName: response[key]['Name'],
          TotalBill: response[key]['TotalBill'],
          AgencyId: response[key]['AgencyId']['_id'],
        }
      });
      
      return callback(null, newResponse);
      // return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}

async function getAgencyById(params, callback) {
  const id = params.id;

  agency
    .findById(id)
    .then((response) => {
      if (!response) callback("Agency Id Invalid!");
      else return callback(null, response);
    })
    .catch((error) => {
      return callback(error);
    });
}



module.exports = {
  createAgency,
  createClient,
  addClientToAgency,
  deleteAgency,
  deleteClient,
  updateClient,
  getAgency,
  // getAgencyById,
};



