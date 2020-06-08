 # Cap Angular Schematic Cloudinary

 Cap Angular Schematic Cloudinary is a schematic that install the __Cloudinary SDK__ into an Angular project. 

 ### Installation
 ```
  ng add cap-angular-schematic-cloudinary
 ```

### Functionality

The Schematic modifies the app module to embed the cloudinary' setting.

Inline-style: 
![alt text]( "Cloudinary schematic")

Example: 

```
imports: [
    BrowserModule,
    CloudinaryModule.forRoot(Cloudinary, {
      cloud_name: 'my-cloud-name',
      api_key: 'my-api-key',
      api_secret: 'my-api-secret',
      upload_preset: 'my-upload-preset',
    })
  ],

```

To know more about Cloudinary see the official [documentation](https://cloudinary.com/documentation/angular_integration#overview).