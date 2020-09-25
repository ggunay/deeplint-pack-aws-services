exports.check = async function (context) {
    const resources = context.getResources()
    let problems = []
    const _ = require('lodash')
    var conditions = ["aws", "sns", "alias"];

    for (const key of Object.keys(resources)) {
        for (const resource of resources[key]) {
            
                let isEnabled = false;

            try {

                if (resource.type === 'aws::sqs::policy::statement') {
                


                    if ((_.has(resource.properties, 'actions') &&  ((conditions.some(tst => (resource.properties.logging_enabled.KmsMasterKeyId).includes(tst)) ))))
                    {
                    
                        //ToDO: complete

                        isEnabled = true;
                        continue;
                        
                    }
                    

                }


            }
            catch(e) {

                    console.error(e.message);
            }
        
            finally{

                if (!isEnabled) {
                    problems.push({
                        message: `AWS SNS Topic ${resource.name} does not have the encryption enabled`
                    })
                }
                    continue;
        
                }
        }

    }
    
    return problems
}