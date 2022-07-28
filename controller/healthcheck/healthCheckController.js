const healthCheckController = {
    healthCheck (req, res) {
        const checkHealth = {
            uptime: process.uptime(),
            responsetime: process.hrtime(),
            message: "OK",
            timestamp: Date.now()
        };

        try{
            res.send(checkHealth);
        }catch(err){
            checkHealth.message = err;
            res.status(503).send();
        }
    }
}

export default healthCheckController;

