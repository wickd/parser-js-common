const fs = require("fs");
const s = require('./slug');
const pets = require('./source/pets');
const vehicles = require('./source/vehicles');
const phones_types = require('./source/phones-types');
const merchant_types = require('./source/merchant-types');
// const other = require('./source/other');
const parsedFolder = "./parsed/";
const itemBody = (k, v) => {
    return {
        active: true,
        // code: k,
        lable: v
    };
}
const types = [
    "pet_type",
    "pet_size_unit",
    "vehicle_make",
    "vehicle_model",
    "vehicle_color",
    "vehicle_year",
    "state",
    "phone_type",
    "merchant_type"
];

const parse = data => {
    let temp = {};

    for(let type in data)
    {
        let types = data[type];
        let key = s.slug(type);

        if(! temp[key]) {
            temp[key] = {};    
        }

        if(! Array.isArray(types)) {
            
            let subtypes = Object.keys(types);
        
            if(subtypes && subtypes.length) {
                for(let i in subtypes) {
                    let _temp = {};            
                    let name = s.slug(subtypes[i]); // slugified
                    // let name = s.unique(subtypes[i]); // uppercased
                    let elements = data[type][subtypes[i]];
                
                    for(let e in elements) {
                        // let _key = s.clear(elements[e]);
                        let _key = s.slug(elements[e]);
                        // let _value = s.unique(elements[e]);
                        let _value = elements[e];
                        _temp[_key] = itemBody(_key, _value);
                    }

                    let __temp = {
                        value: s.slug(subtypes[i]),
                        sub_types: _temp
                    };

                    temp[key][name] = __temp;
                }
            }
        } else {
            let _temp = {};

            for(let type in types) {
                let _key = s.slug(types[type]);
                // let _value = s.unique(types[type]);
                let _value = types[type];
                _temp[_key] = itemBody(_key, _value);
            }

            temp[key] = _temp;            
        }
    }

    return temp;
}

let petsParsed = parse(pets);
let vehiclesParsed = parse(vehicles);
let phonesParsed = parse(phones_types);
let merchantParsed = parse(merchant_types);

fs.writeFileSync(`${parsedFolder}/pets.json`, JSON.stringify(petsParsed), "utf8");
fs.writeFileSync(`${parsedFolder}/vehicles.json`, JSON.stringify(vehiclesParsed), "utf8");
fs.writeFileSync(`${parsedFolder}/phones-types.json`, JSON.stringify(phonesParsed), "utf8");
fs.writeFileSync(`${parsedFolder}/merchant-types.json`, JSON.stringify(merchantParsed), "utf8");

console.log('done');
process.exit();