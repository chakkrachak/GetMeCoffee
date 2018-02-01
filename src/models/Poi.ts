export class Poi {
    name: string;
    coords: {
        lat: number,
        lon: number
    };
    displayInformation: {
        addressLabel: string
    };

    constructor(rawPoi: any) {
        this.name = rawPoi.fields.nom_du_cafe;
        this.displayInformation = {
            addressLabel: rawPoi.fields.adresse + ' ' + rawPoi.fields.arrondissement + ' Paris'
        };

        if (rawPoi.geometry !== undefined) {
            this.coords = {
                lat: rawPoi.geometry.coordinates[0],
                lon: rawPoi.geometry.coordinates[1]
            };
        }
    }
}