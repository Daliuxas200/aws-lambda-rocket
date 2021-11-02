const AWS = require("aws-sdk");
const { formatISO } = require("date-fns");

interface Rocket {
  id: number;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  height: {
    meters: number;
    feet: number;
  };
  diameter: {
    meters: number;
    feet: number;
  };
  mass: {
    kg: number;
    lb: number;
  };
  createdAt?: string;
}

exports.handler = async (event: Rocket[]) => {
  AWS.config.update({
    region: "eu-central-1",
    endpoint: "http://dynamodb.eu-central-1.amazonaws.com",
  });

  const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-central-1" });
  const log = [];

  for (let rocket of event) {
    const timeStamp = new Date();
    const newRocket: Rocket = {
      id: rocket.id,
      active: rocket.active,
      stages: rocket.stages,
      boosters: rocket.boosters,
      cost_per_launch: rocket.cost_per_launch,
      success_rate_pct: rocket.success_rate_pct,
      first_flight: rocket.first_flight,
      country: rocket.country,
      company: rocket.company,
      height: rocket.height,
      diameter: rocket.diameter,
      mass: rocket.mass,
      createdAt: formatISO(timeStamp),
    };

    const params = {
      TableName: process.env.TABLE_NAME,
      Item: newRocket,
    };

    try {
      await docClient.put(params).promise();
      log.push("PutItem succeeded for rocket: ", rocket.id);
    } catch (err) {
      log.push(
        "Unable to add rocket: ",
        rocket.id,
        ". Error JSON:",
        JSON.stringify(err, null, 2)
      );
    }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify(log),
  };
  return response;
};
