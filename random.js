process.on('message', cantidad => {
    const data = {};
    for (let i = 0; i < cantidad; i++) {
        const random = parseInt(Math.ceil(Math.random() * 1000));
        if(data.hasOwnProperty(random)) {
            data[random] += 1;
        }else{
            data[random] = 1;
        }
    }
    process.send(data);
})

