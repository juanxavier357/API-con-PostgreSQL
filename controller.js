const {
  getAllData,
  getDataById,
  createData,
  updateData,
  deleteData,
  getLength,
} = require("./model");

async function handleGetInfo(req, res) {
  const records = await getAllData();
  res.send(
    `Phonebook has info for ${records.length} users <br> <br> ${new Date()}`
  );
}

async function handleGetAllData(req, res) {
  console.log("Middleware del Controler");
  const records = await getAllData();
  return res.json(records);
}

async function handleGetDataById(req, res) {
  const { id } = req.params;
  const record = await getDataById(id);

  if (!record) {
    return res.status(404).json({
      message: "Not Found",
    });
  }

  return res.status(200).json(record);
}

async function handleDeleteData(req, res) {
  const { id } = req.params;
  await deleteData(id);
  return res.json({ message: "Record deleted" });
}

async function handleCreateData(req, res) {
  const data = req.body;

  if (!data.name || !data.phone) {
    return res.status(400).json({
      error: "name or phone is missing",
    });
  }

  const records = await getAllData();
  const existingRecord = records.find((record) => record.name === data.name);

  if (existingRecord) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const record = await createData(data);
  return res.status(201).json(record);
}

async function handleUpdateData(req, res) {
  const { id } = req.params;
  const user = req.body;
  const record = await updateData(id, user);
  if (!record) {
    return res.status(404).json({
      message: "Not Found",
    });
  }
  return res.status(202).json(record);
}


module.exports = {
  handleGetInfo,
  handleGetAllData,
  handleGetDataById,
  handleDeleteData,
  handleCreateData,
  handleUpdateData,
};
