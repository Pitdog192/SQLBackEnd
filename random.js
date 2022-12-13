process.on('message', cantidad => {
    const data = {};
    for (let i = 0; i < cantidad; i++) {
        const random = parseInt(Math.random() * 1000) + 1;
        if(data.hasOwnProperty(random)) {
            data[random] += 1;
        }else{
            data[random] = 1;
        }
    }
    process.send(data);
})

