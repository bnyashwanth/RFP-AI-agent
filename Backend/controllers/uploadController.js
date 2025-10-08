const csv = require('csv-parser'); // for parsing the csv file to json
const fs = require('fs'); // for system file operatoions
const RFP = require('../models/RFP');

exports.uploadRfps = async (req, res) => {
  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => {
      // Basic transformation to match our schema
      const formattedData = {
        title: data.title,
        dueDate: new Date(data.dueDate),
        status: 'Pending',
        products: JSON.parse(data.products), // Assuming products is a JSON string in the CSV
        tests: JSON.parse(data.tests)         // Assuming tests is a JSON string in the CSV
      };
      results.push(formattedData);
    })
    .on('end', async () => {
      try {
        await RFP.insertMany(results);
        fs.unlinkSync(req.file.path); // Clean up the uploaded file
        res.status(200).send({ message: `${results.length} RFPs uploaded successfully!` });
      } catch (error) {
        res.status(500).send({ message: 'Error saving to database', error });
      }
    });
};