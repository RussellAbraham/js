const port = process.env.PORT || 8888;
const ip = process.env.IP || '0.0.0.0';

function toSource(func) {
  if (func != null) {
    try { return Function.prototype.toString.call(func); } catch (e) {}    
    try { return (func + ''); } catch (e) {} 
  }    
  return '';    
}

function getLocalIps() {    
    var os = require("os");
    var interfaces = os.networkInterfaces ? os.networkInterfaces() : {};    
    var addresses = [];    
    for (var k in interfaces) {        
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];            
            if (address.family === "IPv4" && !address.internal) {            
                addresses.push(address.address);            
            }            
            if (address.family === "IPv6" && !address.internal) {
                 addresses.push(address.address);
            }
            console.info({
                'addresses' : address,
                'interfaces' : interfaces
            });            
        }
    }    
    return addresses;
}

console.log({
    'source' : toSource(getLocalIps()).split(','),
    'ips':"http://" + (ip == "0.0.0.0" ? getLocalIps()[0] : ip) + ":" + port
});
