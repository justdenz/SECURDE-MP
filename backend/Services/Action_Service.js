const {InitializeActions} = require('./Action_DB')

async function InitializeActionContent(){
  await InitializeActions()
}

module.exports = {
  InitializeActionContent
}