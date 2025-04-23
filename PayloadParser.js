function parseUplink(device, payload)
{
    // Payload is json
    var data = payload.asJsonObject();

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

        // Sensor de puerta controlador
        var ep = device.endpoints.byAddress("10");
        if (ep != null & data.Switch !=null)
            if (data.Switch){
                ep.updateIASSensorStatus(iasSensorState.active)
            } else {
                ep.updateIASSensorStatus(iasSensorState.idle)
            }
        }
       
        // Potencia activa
        var ep = device.endpoints.byAddress("20");
        if (ep != null && data.Current != null)
            ep.updateActivePowerSensorStatus(data.Current);

        // On-off switch
        var ep = device.endpoints.byAddress("30");
        if (ep != null && data.Power != null)
            ep.updateApplianceStatus(data.Power);

       
        //Control de brillo diurno
        var ep = device.endpoints.byAddress("40");
        if (ep != null && data.DayBright != null)
        {
            ep.updateDimmerStatus(data.DayBright.isOn, data.DayBright.dimValue);
        }    
        
        //Control de brillo Nocturno
        var ep = device.endpoints.byAddress("50");
        if (ep != null && data.NightBright != null)
        {
            ep.updateDimmerStatus(data.NightBright.isOn, data.NightBright.dimValue);
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
    env.log(command);
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
	 	 	 	 	if (endpoint.Address == 40 || endpoint.Address == 50)
                    {
                        var obj = { 
                            CommandId: command.commandId,
                            Sign: endpoint.address, 
                            Command: "TurnOnDimmer"
                        };
                        payload.setAsJsonObject(obj);
                        payload.requiresResponse = true;
                        break;
                    } else{
                        var obj = { 
                            CommandId: command.commandId,
                            Sign: endpoint.address, 
                            Command: "TurnOn", 
                        };
                        payload.setAsJsonObject(obj);
                        payload.requiresResponse = true;
	 	 	 	 	    break; 
                    } 
                case onOffCommandType.turnOff:
                    if (endpoint.Address == 40 || endpoint.Address == 50)
                    {
                        var obj = { 
                            CommandId: command.commandId,
                            Sign: endpoint.address, 
                            Command: "TurnOffDimmer"
                        };
                        payload.setAsJsonObject(obj);
                        payload.requiresResponse = true;
                        break;
                    } else{
                        var obj = { 
                            CommandId: command.commandId,
                            Sign: endpoint.address, 
                            Command: "TurnOff", 
                        };
                        payload.setAsJsonObject(obj);
                        payload.requiresResponse = true;
	 	 	 	 	    break; 
                    } 
	 	 	 	 	
	 	 	 	default: 
	 	 	 	 	payload.buildResult = downlinkBuildResult.unsupported;
	 	 	 	 	break; 
	 	 	} 
	 	 	break;
        case commandType.dimmer:
            var obj = { 
                CommandId: command.commandId,
                Command: "SetLevel",
                Sign: endpoint.Address,
                Value: command.dimmer.level
            };
            payload.setAsJsonObject(obj);
            payload.requiresResponse = true;
			break;  
	 	default: 
	 	 	payload.buildResult = downlinkBuildResult.unsupported;
            payload.errorMessage = { en: "Unsupported command", es: "Comando no soportado" };
	 	 	break; 
	}

}