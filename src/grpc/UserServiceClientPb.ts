/**
 * @fileoverview gRPC-Web generated client stub for
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.2
// 	protoc              v4.22.3
// source: user.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as user_pb from './user_pb.d.ts';


export class UserServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorAddUser = new grpcWeb.MethodDescriptor(
      '/UserService/AddUser',
      grpcWeb.MethodType.UNARY,
      user_pb.User,
      user_pb.Response,
      (request: user_pb.User) => {
        return request.serializeBinary();
      },
      user_pb.Response.deserializeBinary
  );

  addUser(
      request: user_pb.User,
      metadata: grpcWeb.Metadata | null): Promise<user_pb.Response>;

  addUser(
      request: user_pb.User,
      metadata: grpcWeb.Metadata | null,
      callback: (err: grpcWeb.RpcError,
                 response: user_pb.Response) => void): grpcWeb.ClientReadableStream<user_pb.Response>;

  addUser(
      request: user_pb.User,
      metadata: grpcWeb.Metadata | null,
      callback?: (err: grpcWeb.RpcError,
                  response: user_pb.Response) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
          this.hostname_ +
          '/UserService/AddUser',
          request,
          metadata || {},
          this.methodDescriptorAddUser,
          callback);
    }
    return this.client_.unaryCall(
        this.hostname_ +
        '/UserService/AddUser',
        request,
        metadata || {},
        this.methodDescriptorAddUser);
  }

}

