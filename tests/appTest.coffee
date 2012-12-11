require "../app.js"
request = require "request"
assert = require "assert"

host = "localhost"
port = 3003

describe "app", ->
  it "responds with 404 on root", (done)->
    request.get "http://#{host}:#{port}/", (error, response, body)->
      assert.equal response.statusCode, 404
      done()

  it "allows an empty document to be able to be created with put and retrieved with get", (done)->
    #TODO actually clear out redis on each db run
    fake_doc_id = new Date().getTime()
    request.put "http://#{host}:#{port}/doc/#{fake_doc_id}", {body: '{"type": "text"}'}, (error, response, body)->
      console.log "status code is #{error} #{response.statusCode}, #{body}"
      assert.equal response.statusCode, 200
      request.get "http://#{host}:#{port}/doc/fake_doc_id", (error, response, body)->
        console.log "status code is #{response.statusCode}"
        assert.equal response.statusCode, 200
        done()
    
    