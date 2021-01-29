# rule-validation-api
This is a simple rule validation API with two routes.

The second route (i.e /validate-rule) is the validation route.
it accepts JSON object containing data and the rule that will be used
to validate the data field.

The field to be validate should be specified in the data section of the payload
as follows:

    {
        "rule": {
            "field":"missions",
            "condition":"gte",
            "condition_value":30,
        },
        "data": {
            "name":"John Doe",
            "crew":"foo",
            "age":33,
            "position":"captain",
            "missions":45
        },
    }
    
   
   Note: The data and rule field are required
