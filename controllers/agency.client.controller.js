const agencyClientServices = require("../services/agency.client.services");

exports.createAgencyWithClient = (req, res, next) => {
  agencyClientServices.createAgency(req.body, (error, results) => {
    if (error) {
      return next(error);
    } else {
      //   req.body.client.AgencyId = results._id;

      var reqClient = req.body.client;
      var newResponse = [];
      const obj = Object.keys(reqClient);
      obj.forEach((key, index) => {
        newResponse.push({
          AgencyId: results._id,
          Name: reqClient[key]["Name"],
          Email: reqClient[key]["Email"],
          PhoneNumber: reqClient[key]["PhoneNumber"],
          TotalBill: reqClient[key]["TotalBill"],
        });
      });

      req.body.client = newResponse;
      agencyClientServices.createClient(
        req.body,
        (createClientError, createClientResults) => {
          if (createClientError) {
            agencyClientServices.deleteAgency(
              results._id,
              (delAgnErr, agnResults) => {
                if (delAgnErr) {
                  console.log("delAgnErr: " + delAgnErr);
                  return next(delAgnErr);
                } else {
                  console.log("createClientError: " + createClientError);
                  return next(createClientError);
                }
              }
            );
          } else {
            return res.status(200).send({
              message: "Success",
              data: { agency: results, client: createClientResults },
            });

            // var model = {
            //   AgencyId: results._id,
            // };
            // agencyClientServices.addClientToAgency(
            //   createClientResults._id,
            //   model,
            //   (addClientToAgencyError, addClientToAgencyResults) => {
            //     if (addClientToAgencyError) {
            //       return next(addClientToAgencyError);
            //     } else {
            //       return res.status(200).send({
            //         message: "Success",
            //         data: { agency: results, client: createClientResults },
            //       });
            //     }
            //   }
            // );
          }
        }
      );
    }
  });
};

exports.clientUpdate = (req, res, next) => {
  if (!req.params.id) {
    return callback({ message: "Client Id Required" });
  }
  var model = {
    Name: req.body.Name,
    Email: req.body.Email,
    PhoneNumber: req.body.PhoneNumber,
    TotalBill: req.body.TotalBill,
  };

  agencyClientServices.updateClient(req.params.id, model, (error, result) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: result,
      });
    }
  });
};

exports.findAll = (req, res, next) => {
  var model = {};

  agencyClientServices.getAgency(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};

exports.findOne = (req, res, next) => {
  var model = {
    id: req.params.id,
  };

  agencyClientServices.getAgencyById(model, (error, results) => {
    if (error) {
      return next(error);
    } else {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    }
  });
};
