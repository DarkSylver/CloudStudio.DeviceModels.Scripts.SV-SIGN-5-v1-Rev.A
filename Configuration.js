function getConfiguration(config)
{
  // This function allows you to indicate general configuration values
  // for all devices of this model.

  // Depending on the meaning of the "device address" in this device, 
  // you may want to change the label that is used to refer to the 
  // address in the user interface.
  // For instance, if the address of the device is actually a MAC 
  // address, you may want to use the code below.
  
  config.addressLabel = {en: "Serial Number", es: "Número de serie"};
}

function getEndpoints(deviceAddress, endpoints)
{
  // This function allows you to indicate the initial endpoint configuration
  // when a device is created using this model. This improves end-user 
  // experience significantly, because it allows the platform to create
  // all endpoints included in the device automatically when the device
  // is created.

  // In the code below, two endpoints are created. The first is a
  // temperature sensor, while the second one is a carbon dioxide sensor.

  var ep = endpoints.addEndpoint("1", "Tarifa 1", endpointType.genericSensor);
  ep.variableTypeId = 1125;
  ep.accessType = endpointAccessType.readWriteCommand;
  ep.operationSecurityLevel = endpointOperationSecurityLevel.medium;

  var ep = endpoints.addEndpoint("2", "Tarifa 2", endpointType.genericSensor);
  ep.variableTypeId = 1125;
  ep.accessType = endpointAccessType.readWriteCommand;
  ep.operationSecurityLevel = endpointOperationSecurityLevel.medium;

  var ep = endpoints.addEndpoint("3", "Tarifa 3", endpointType.genericSensor);
  ep.variableTypeId = 1125;
  ep.accessType = endpointAccessType.readWriteCommand;
  ep.operationSecurityLevel = endpointOperationSecurityLevel.medium;

  var ep = endpoints.addEndpoint("4", "Tarifa 4", endpointType.genericSensor);
  ep.variableTypeId = 1125;
  ep.accessType = endpointAccessType.readWriteCommand;
  ep.operationSecurityLevel = endpointOperationSecurityLevel.medium;

  var ep = endpoints.addEndpoint("5", "Tarifa 5", endpointType.genericSensor);
  ep.variableTypeId = 1125;
  ep.accessType = endpointAccessType.readWriteCommand;
  ep.operationSecurityLevel = endpointOperationSecurityLevel.medium;

  endpoints.addEndpoint("10", "Temperature sensor", endpointType.temperatureSensor);

  endpoints.addEndpoint("20", "Potencia Activa", endpointType.activePowerSensor);

  var ep = endpoints.addEndpoint("30", "Power", endpointType.appliance);
  ep.operationSecurityLevel = endpointOperationSecurityLevel.medium;


}

function validateDeviceAddress(address, result)
{
  // This function allows you to validate the address of a device, when
  // the user is creating it. If your device has special validation rules
  // for the address, you can check them here, and return an error message
  // in case the address format is incorrect.

  // In the code below, a validation is made to ensure that the address 
  // is exactly 10 characters long.
  
  // if (address.length != 10) {
  //   result.ok = false;
  //   result.errorMessage = {
  //     en: "The address must be 10 characters long", 
  //     es: "La dirección debe tener exactamente 10 caracteres"
  //   };
  // }
}

function updateDeviceUIRules(device, rules)
{
  // This function allows you to specify UI rules at the device level.
  // For instance, you can make it possible to enable or disable adding
  // endpoints manually to the device after it was created.
  
  // In the code below, adding endpoints manually is disabled in the
  // user interface. This means that the device will be limited to the 
  // endpoints defined by function getEndpoints() above.
  
  rules.canCreateEndpoints = false;
}

function updateEndpointUIRules(endpoint, rules)
{
  // This function allows you to specify UI rules at the endpoint level.
  // For instance, you can make it possible to delete certain endpoints, 
  // or edit their endpoint subtype, if applicable.

  // In the code below, the following rules are defined:
  // - Endpoints cannot be deleted.
  // - The endpoint subtype can be changed, but only for the second 
  //   endpoint.
  
   rules.canDelete = false;
  // rules.canEditSubType = (endpoint.address == "2");
}
