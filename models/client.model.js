const mongoose = require("mongoose");

const client = mongoose.model(
    "client",
    mongoose.Schema(
        {
            // ClientId: {
            //     type: String,
            //     required: true,
            // },
            AgencyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "agency",
                required: true,
            },
            Name: {
                type: String,
                required: true,
            },
            Email: {
                type: String
            },
            PhoneNumber:{
                type: String,
                required: true,
            },
            TotalBill:{
                type: String,
                required: true,
            }
        }

    )
);

module.exports = {
    client,
}
