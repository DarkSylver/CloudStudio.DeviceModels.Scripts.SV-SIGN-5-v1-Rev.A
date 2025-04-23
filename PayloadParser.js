function parseUplink(device, payload)
{
    // Payload is json
    var data = payload.asJsonObject();

    env.log(data);

    if (data.Type == "data")
    {
        // Tarifa 1
        var ep = device.endpoints.byAddress("1");
        if (ep != null && data.Tarifa1 != null)
            ep.updateGenericSensorStatus(data.Tarifa1);

        // Tarifa 2
        var ep = device.endpoints.byAddress("2");
        if (ep != null && data.Tarifa2 != null)
            ep.updateGenericSensorStatus(data.Tarifa2);

        // Tarifa 3
        var ep = device.endpoints.byAddress("3");
        if (ep != null && data.Tarifa3 != null)
            ep.updateGenericSensorStatus(data.Tarifa3);

        // Tarifa 4
        var ep = device.endpoints.byAddress("4");
        if (ep != null && data.Tarifa4 != null)
            ep.updateGenericSensorStatus(data.Tarifa4);

        // Tarifa 5
        var ep = device.endpoints.byAddress("5");
        if (ep != null && data.Tarifa5 != null)
            ep.updateGenericSensorStatus(data.Tarifa5);

        // Temperature
        var ep = device.endpoints.byAddress("10");
        if (ep != null && data.Temperature != null)
            ep.updateTemperatureSensorStatus(data.Temperature);

        // Potencia activa
        var ep = device.endpoints.byAddress("20");
        if (ep != null && data.Current != null)
            ep.updateActivePowerSensorStatus(data.Current);

        // On-off switch
        var ep = device.endpoints.byAddress("30");
        if (ep != null && data.Power != null)
            ep.updateApplianceStatus(data.Power);

        // Dimmer
        //var ep = device.endpoints.byAddress("40");
        //if (ep != null)
        //   ep.updateDimmerStatus(true, 80);    
        
    }

    if (data.Type == "response")
    {
        if (data.Success) 
        {
            device.respondCommand(data.CommandId, commandResponseType.success);
        }
        else 
        {
            device.respondCommand(data.CommandId, commandResponseType.error, data.ErrorMessage, data.ErrorCode);
        }
    }

}

function buildDownlink(device, endpoint, command, payload) 
{ 
	payload.buildResult = downlinkBuildResult.ok; 

	switch (command.type) {
	 	case commandType.management: 
	 	 	switch (command.management.type) { 
	 	 	 	case managementCommandType.setValue:
                    var obj = { 
                        CommandId: command.commandId,
                        Sign: endpoint.address, 
                        Command: "setValue", 
                        Value: command.management.setValue.newValue 
                    };
                    payload.setAsJsonObject(obj);
                    payload.requiresResponse = true;
	 	 	 	 	break; 
	 	 	} 
	 	 	break;
        case commandType.onOff:
            switch (command.onOff.type) { 
	 	 	    case onOffCommandType.turnOn:
	 	 	 	 	var obj = { 
                        CommandId: command.commandId,
                        Sign: endpoint.address, 
                        Command: "TurnOn", 
                    };
                    payload.setAsJsonObject(obj);
                    payload.requiresResponse = true;
	 	 	 	 	break; 
	 	 	 	case onOffCommandType.turnOff: 
	 	 	 	 	var obj = { 
                        CommandId: command.commandId,
                        Sign: endpoint.address, 
                        Command: "TurnOff", 
                    };
                    payload.setAsJsonObject(obj);
                    payload.requiresResponse = true;
	 	 	 	 	break; 
	 	 	 	default: 
	 	 	 	 	payload.buildResult = downlinkBuildResult.unsupported;
	 	 	 	 	break; 
	 	 	} 
	 	 	break;  
	 	default: 
	 	 	payload.buildResult = downlinkBuildResult.unsupported;
            payload.errorMessage = { en: "Unsupported command", es: "Comando no soportado" };
	 	 	break; 
	}

}