// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {APICallback, Callback, CallOptions, Descriptors, ClientOptions, LROperation} from 'google-gax';
import * as path from 'path';

import * as protosTypes from '../../protos/protos';
import * as gapicConfig from './image_annotator_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Service that performs Google Cloud Vision API detection tasks over client
 *  images, such as face, landmark, logo, label, and text detection. The
 *  ImageAnnotator service returns detected entities from the images.
 * @class
 * @memberof v1
 */
export class ImageAnnotatorClient {
  private _descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}};
  private _innerApiCalls: {[name: string]: Function};
  private _pathTemplates: {[name: string]: gax.PathTemplate};
  private _terminated = false;
  auth: gax.GoogleAuth;
  operationsClient: gax.OperationsClient;
  imageAnnotatorStub: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of ImageAnnotatorClient.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {function} [options.promise] - Custom promise module to use instead
   *     of native Promises.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this.constructor as typeof ImageAnnotatorClient;
    const servicePath = opts && opts.servicePath ?
        opts.servicePath :
        ((opts && opts.apiEndpoint) ? opts.apiEndpoint :
                                      staticMembers.servicePath);
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = (typeof window !== 'undefined');
    if (isBrowser){
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    const gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this.constructor as typeof ImageAnnotatorClient).scopes;
    const gaxGrpc = new gaxModule.GrpcClient(opts);

    // Save the auth object to the client, for use by other methods.
    this.auth = (gaxGrpc.auth as gax.GoogleAuth);

    // Determine the client header string.
    const clientHeader = [
      `gax/${gaxModule.version}`,
      `gapic/${version}`,
    ];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(__dirname, '..', '..', 'protos', 'protos.json');
    const protos = gaxGrpc.loadProto(
      opts.fallback ?
        require("../../protos/protos.json") :
        nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      productPathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/products/{product}'
      ),
      productSetPathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/productSets/{product_set}'
      ),
      referenceImagePathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/locations/{location}/products/{product}/referenceImages/{reference_image}'
      ),
    };

    // This API contains "long-running operations", which return a
    // an Operation object that allows for tracking of the operation,
    // rather than holding a request open.
    const protoFilesRoot = opts.fallback?
      gaxModule.protobuf.Root.fromJSON(require("../../protos/protos.json")) :
      gaxModule.protobuf.loadSync(nodejsProtoPath);

    this.operationsClient = gaxModule.lro({
      auth: this.auth,
      grpc: 'grpc' in gaxGrpc ? gaxGrpc.grpc : undefined
    }).operationsClient(opts);
    const asyncBatchAnnotateImagesResponse = protoFilesRoot.lookup(
      '.google.cloud.vision.v1.AsyncBatchAnnotateImagesResponse') as gax.protobuf.Type;
    const asyncBatchAnnotateImagesMetadata = protoFilesRoot.lookup(
      '.google.cloud.vision.v1.OperationMetadata') as gax.protobuf.Type;
    const asyncBatchAnnotateFilesResponse = protoFilesRoot.lookup(
      '.google.cloud.vision.v1.AsyncBatchAnnotateFilesResponse') as gax.protobuf.Type;
    const asyncBatchAnnotateFilesMetadata = protoFilesRoot.lookup(
      '.google.cloud.vision.v1.OperationMetadata') as gax.protobuf.Type;

    this._descriptors.longrunning = {
      asyncBatchAnnotateImages: new gaxModule.LongrunningDescriptor(
        this.operationsClient,
        asyncBatchAnnotateImagesResponse.decode.bind(asyncBatchAnnotateImagesResponse),
        asyncBatchAnnotateImagesMetadata.decode.bind(asyncBatchAnnotateImagesMetadata)),
      asyncBatchAnnotateFiles: new gaxModule.LongrunningDescriptor(
        this.operationsClient,
        asyncBatchAnnotateFilesResponse.decode.bind(asyncBatchAnnotateFilesResponse),
        asyncBatchAnnotateFilesMetadata.decode.bind(asyncBatchAnnotateFilesMetadata))
    };

    // Put together the default options sent with requests.
    const defaults = gaxGrpc.constructSettings(
        'google.cloud.vision.v1.ImageAnnotator', gapicConfig as gax.ClientConfig,
        opts.clientConfig || {}, {'x-goog-api-client': clientHeader.join(' ')});

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.cloud.vision.v1.ImageAnnotator.
    this.imageAnnotatorStub = gaxGrpc.createStub(
        opts.fallback ?
          (protos as protobuf.Root).lookupService('google.cloud.vision.v1.ImageAnnotator') :
          // tslint:disable-next-line no-any
          (protos as any).google.cloud.vision.v1.ImageAnnotator,
        opts) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const imageAnnotatorStubMethods =
        ['batchAnnotateImages', 'batchAnnotateFiles', 'asyncBatchAnnotateImages', 'asyncBatchAnnotateFiles'];

    for (const methodName of imageAnnotatorStubMethods) {
      const innerCallPromise = this.imageAnnotatorStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          return stub[methodName].apply(stub, args);
        },
        (err: Error|null|undefined) => () => {
          throw err;
        });

      const apiCall = gaxModule.createApiCall(
        innerCallPromise,
        defaults[methodName],
        this._descriptors.page[methodName] ||
            this._descriptors.stream[methodName] ||
            this._descriptors.longrunning[methodName]
      );

      this._innerApiCalls[methodName] = (
        argument: {},
        callOptions?: CallOptions,
        callback?: APICallback
      ) => {
        return apiCall(argument, callOptions, callback);
      };
    }
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'vision.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'vision.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/cloud-vision'
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(callback?: Callback<string, undefined, undefined>):
      Promise<string>|void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  batchAnnotateImages(
      request: protosTypes.google.cloud.vision.v1.IBatchAnnotateImagesRequest,
      options?: gax.CallOptions):
      Promise<[
        protosTypes.google.cloud.vision.v1.IBatchAnnotateImagesResponse,
        protosTypes.google.cloud.vision.v1.IBatchAnnotateImagesRequest|undefined, {}|undefined
      ]>;
  batchAnnotateImages(
      request: protosTypes.google.cloud.vision.v1.IBatchAnnotateImagesRequest,
      options: gax.CallOptions,
      callback: Callback<
          protosTypes.google.cloud.vision.v1.IBatchAnnotateImagesResponse,
          protosTypes.google.cloud.vision.v1.IBatchAnnotateImagesRequest|undefined,
          {}|undefined>): void;
/**
 * Run image detection and annotation for a batch of images.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {number[]} request.requests
 *   Required. Individual image annotation requests for this batch.
 * @param {string} request.parent
 *   Optional. Target project and location to make a call.
 *
 *   Format: `projects/{project-id}/locations/{location-id}`.
 *
 *   If no parent is specified, a region will be chosen automatically.
 *
 *   Supported location-ids:
 *       `us`: USA country only,
 *       `asia`: East asia areas, like Japan, Taiwan,
 *       `eu`: The European Union.
 *
 *   Example: `projects/project-A/locations/eu`.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [BatchAnnotateImagesResponse]{@link google.cloud.vision.v1.BatchAnnotateImagesResponse}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  batchAnnotateImages(
      request: protosTypes.google.cloud.vision.v1.IBatchAnnotateImagesRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          protosTypes.google.cloud.vision.v1.IBatchAnnotateImagesResponse,
          protosTypes.google.cloud.vision.v1.IBatchAnnotateImagesRequest|undefined, {}|undefined>,
      callback?: Callback<
          protosTypes.google.cloud.vision.v1.IBatchAnnotateImagesResponse,
          protosTypes.google.cloud.vision.v1.IBatchAnnotateImagesRequest|undefined,
          {}|undefined>):
      Promise<[
        protosTypes.google.cloud.vision.v1.IBatchAnnotateImagesResponse,
        protosTypes.google.cloud.vision.v1.IBatchAnnotateImagesRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    return this._innerApiCalls.batchAnnotateImages(request, options, callback);
  }
  batchAnnotateFiles(
      request: protosTypes.google.cloud.vision.v1.IBatchAnnotateFilesRequest,
      options?: gax.CallOptions):
      Promise<[
        protosTypes.google.cloud.vision.v1.IBatchAnnotateFilesResponse,
        protosTypes.google.cloud.vision.v1.IBatchAnnotateFilesRequest|undefined, {}|undefined
      ]>;
  batchAnnotateFiles(
      request: protosTypes.google.cloud.vision.v1.IBatchAnnotateFilesRequest,
      options: gax.CallOptions,
      callback: Callback<
          protosTypes.google.cloud.vision.v1.IBatchAnnotateFilesResponse,
          protosTypes.google.cloud.vision.v1.IBatchAnnotateFilesRequest|undefined,
          {}|undefined>): void;
/**
 * Service that performs image detection and annotation for a batch of files.
 * Now only "application/pdf", "image/tiff" and "image/gif" are supported.
 *
 * This service will extract at most 5 (customers can specify which 5 in
 * AnnotateFileRequest.pages) frames (gif) or pages (pdf or tiff) from each
 * file provided and perform detection and annotation for each image
 * extracted.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {number[]} request.requests
 *   Required. The list of file annotation requests. Right now we support only one
 *   AnnotateFileRequest in BatchAnnotateFilesRequest.
 * @param {string} request.parent
 *   Optional. Target project and location to make a call.
 *
 *   Format: `projects/{project-id}/locations/{location-id}`.
 *
 *   If no parent is specified, a region will be chosen automatically.
 *
 *   Supported location-ids:
 *       `us`: USA country only,
 *       `asia`: East asia areas, like Japan, Taiwan,
 *       `eu`: The European Union.
 *
 *   Example: `projects/project-A/locations/eu`.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [BatchAnnotateFilesResponse]{@link google.cloud.vision.v1.BatchAnnotateFilesResponse}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  batchAnnotateFiles(
      request: protosTypes.google.cloud.vision.v1.IBatchAnnotateFilesRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          protosTypes.google.cloud.vision.v1.IBatchAnnotateFilesResponse,
          protosTypes.google.cloud.vision.v1.IBatchAnnotateFilesRequest|undefined, {}|undefined>,
      callback?: Callback<
          protosTypes.google.cloud.vision.v1.IBatchAnnotateFilesResponse,
          protosTypes.google.cloud.vision.v1.IBatchAnnotateFilesRequest|undefined,
          {}|undefined>):
      Promise<[
        protosTypes.google.cloud.vision.v1.IBatchAnnotateFilesResponse,
        protosTypes.google.cloud.vision.v1.IBatchAnnotateFilesRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    return this._innerApiCalls.batchAnnotateFiles(request, options, callback);
  }

  asyncBatchAnnotateImages(
      request: protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateImagesRequest,
      options?: gax.CallOptions):
      Promise<[
        LROperation<protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateImagesResponse, protosTypes.google.cloud.vision.v1.IOperationMetadata>,
        protosTypes.google.longrunning.IOperation|undefined, {}|undefined
      ]>;
  asyncBatchAnnotateImages(
      request: protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateImagesRequest,
      options: gax.CallOptions,
      callback: Callback<
          LROperation<protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateImagesResponse, protosTypes.google.cloud.vision.v1.IOperationMetadata>,
          protosTypes.google.longrunning.IOperation|undefined,
          {}|undefined>): void;
/**
 * Run asynchronous image detection and annotation for a list of images.
 *
 * Progress and results can be retrieved through the
 * `google.longrunning.Operations` interface.
 * `Operation.metadata` contains `OperationMetadata` (metadata).
 * `Operation.response` contains `AsyncBatchAnnotateImagesResponse` (results).
 *
 * This service will write image annotation outputs to json files in customer
 * GCS bucket, each json file containing BatchAnnotateImagesResponse proto.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {number[]} request.requests
 *   Required. Individual image annotation requests for this batch.
 * @param {google.cloud.vision.v1.OutputConfig} request.outputConfig
 *   Required. The desired output location and metadata (e.g. format).
 * @param {string} request.parent
 *   Optional. Target project and location to make a call.
 *
 *   Format: `projects/{project-id}/locations/{location-id}`.
 *
 *   If no parent is specified, a region will be chosen automatically.
 *
 *   Supported location-ids:
 *       `us`: USA country only,
 *       `asia`: East asia areas, like Japan, Taiwan,
 *       `eu`: The European Union.
 *
 *   Example: `projects/project-A/locations/eu`.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Operation]{@link google.longrunning.Operation}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  asyncBatchAnnotateImages(
      request: protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateImagesRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          LROperation<protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateImagesResponse, protosTypes.google.cloud.vision.v1.IOperationMetadata>,
          protosTypes.google.longrunning.IOperation|undefined, {}|undefined>,
      callback?: Callback<
          LROperation<protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateImagesResponse, protosTypes.google.cloud.vision.v1.IOperationMetadata>,
          protosTypes.google.longrunning.IOperation|undefined,
          {}|undefined>):
      Promise<[
        LROperation<protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateImagesResponse, protosTypes.google.cloud.vision.v1.IOperationMetadata>,
        protosTypes.google.longrunning.IOperation|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    return this._innerApiCalls.asyncBatchAnnotateImages(request, options, callback);
  }
  asyncBatchAnnotateFiles(
      request: protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateFilesRequest,
      options?: gax.CallOptions):
      Promise<[
        LROperation<protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateFilesResponse, protosTypes.google.cloud.vision.v1.IOperationMetadata>,
        protosTypes.google.longrunning.IOperation|undefined, {}|undefined
      ]>;
  asyncBatchAnnotateFiles(
      request: protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateFilesRequest,
      options: gax.CallOptions,
      callback: Callback<
          LROperation<protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateFilesResponse, protosTypes.google.cloud.vision.v1.IOperationMetadata>,
          protosTypes.google.longrunning.IOperation|undefined,
          {}|undefined>): void;
/**
 * Run asynchronous image detection and annotation for a list of generic
 * files, such as PDF files, which may contain multiple pages and multiple
 * images per page. Progress and results can be retrieved through the
 * `google.longrunning.Operations` interface.
 * `Operation.metadata` contains `OperationMetadata` (metadata).
 * `Operation.response` contains `AsyncBatchAnnotateFilesResponse` (results).
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {number[]} request.requests
 *   Required. Individual async file annotation requests for this batch.
 * @param {string} request.parent
 *   Optional. Target project and location to make a call.
 *
 *   Format: `projects/{project-id}/locations/{location-id}`.
 *
 *   If no parent is specified, a region will be chosen automatically.
 *
 *   Supported location-ids:
 *       `us`: USA country only,
 *       `asia`: East asia areas, like Japan, Taiwan,
 *       `eu`: The European Union.
 *
 *   Example: `projects/project-A/locations/eu`.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [Operation]{@link google.longrunning.Operation}.
 *   The promise has a method named "cancel" which cancels the ongoing API call.
 */
  asyncBatchAnnotateFiles(
      request: protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateFilesRequest,
      optionsOrCallback?: gax.CallOptions|Callback<
          LROperation<protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateFilesResponse, protosTypes.google.cloud.vision.v1.IOperationMetadata>,
          protosTypes.google.longrunning.IOperation|undefined, {}|undefined>,
      callback?: Callback<
          LROperation<protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateFilesResponse, protosTypes.google.cloud.vision.v1.IOperationMetadata>,
          protosTypes.google.longrunning.IOperation|undefined,
          {}|undefined>):
      Promise<[
        LROperation<protosTypes.google.cloud.vision.v1.IAsyncBatchAnnotateFilesResponse, protosTypes.google.cloud.vision.v1.IOperationMetadata>,
        protosTypes.google.longrunning.IOperation|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'parent': request.parent || '',
    });
    return this._innerApiCalls.asyncBatchAnnotateFiles(request, options, callback);
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified product resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} product
   * @returns {string} Resource name string.
   */
  productPath(project:string,location:string,product:string) {
    return this._pathTemplates.productPathTemplate.render({
      project: project,
      location: location,
      product: product,
    });
  }

  /**
   * Parse the project from Product resource.
   *
   * @param {string} productName
   *   A fully-qualified path representing Product resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProductName(productName: string) {
    return this._pathTemplates.productPathTemplate.match(productName).project;
  }

  /**
   * Parse the location from Product resource.
   *
   * @param {string} productName
   *   A fully-qualified path representing Product resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromProductName(productName: string) {
    return this._pathTemplates.productPathTemplate.match(productName).location;
  }

  /**
   * Parse the product from Product resource.
   *
   * @param {string} productName
   *   A fully-qualified path representing Product resource.
   * @returns {string} A string representing the product.
   */
  matchProductFromProductName(productName: string) {
    return this._pathTemplates.productPathTemplate.match(productName).product;
  }

  /**
   * Return a fully-qualified productSet resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} product_set
   * @returns {string} Resource name string.
   */
  productSetPath(project:string,location:string,productSet:string) {
    return this._pathTemplates.productSetPathTemplate.render({
      project: project,
      location: location,
      product_set: productSet,
    });
  }

  /**
   * Parse the project from ProductSet resource.
   *
   * @param {string} productSetName
   *   A fully-qualified path representing ProductSet resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProductSetName(productSetName: string) {
    return this._pathTemplates.productSetPathTemplate.match(productSetName).project;
  }

  /**
   * Parse the location from ProductSet resource.
   *
   * @param {string} productSetName
   *   A fully-qualified path representing ProductSet resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromProductSetName(productSetName: string) {
    return this._pathTemplates.productSetPathTemplate.match(productSetName).location;
  }

  /**
   * Parse the product_set from ProductSet resource.
   *
   * @param {string} productSetName
   *   A fully-qualified path representing ProductSet resource.
   * @returns {string} A string representing the product_set.
   */
  matchProductSetFromProductSetName(productSetName: string) {
    return this._pathTemplates.productSetPathTemplate.match(productSetName).product_set;
  }

  /**
   * Return a fully-qualified referenceImage resource name string.
   *
   * @param {string} project
   * @param {string} location
   * @param {string} product
   * @param {string} reference_image
   * @returns {string} Resource name string.
   */
  referenceImagePath(project:string,location:string,product:string,referenceImage:string) {
    return this._pathTemplates.referenceImagePathTemplate.render({
      project: project,
      location: location,
      product: product,
      reference_image: referenceImage,
    });
  }

  /**
   * Parse the project from ReferenceImage resource.
   *
   * @param {string} referenceImageName
   *   A fully-qualified path representing ReferenceImage resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromReferenceImageName(referenceImageName: string) {
    return this._pathTemplates.referenceImagePathTemplate.match(referenceImageName).project;
  }

  /**
   * Parse the location from ReferenceImage resource.
   *
   * @param {string} referenceImageName
   *   A fully-qualified path representing ReferenceImage resource.
   * @returns {string} A string representing the location.
   */
  matchLocationFromReferenceImageName(referenceImageName: string) {
    return this._pathTemplates.referenceImagePathTemplate.match(referenceImageName).location;
  }

  /**
   * Parse the product from ReferenceImage resource.
   *
   * @param {string} referenceImageName
   *   A fully-qualified path representing ReferenceImage resource.
   * @returns {string} A string representing the product.
   */
  matchProductFromReferenceImageName(referenceImageName: string) {
    return this._pathTemplates.referenceImagePathTemplate.match(referenceImageName).product;
  }

  /**
   * Parse the reference_image from ReferenceImage resource.
   *
   * @param {string} referenceImageName
   *   A fully-qualified path representing ReferenceImage resource.
   * @returns {string} A string representing the reference_image.
   */
  matchReferenceImageFromReferenceImageName(referenceImageName: string) {
    return this._pathTemplates.referenceImagePathTemplate.match(referenceImageName).reference_image;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    if (!this._terminated) {
      return this.imageAnnotatorStub.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}