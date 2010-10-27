require 'rubygems'
require 'sinatra'
require 'json'
require 'GameOfLife'
require 'Cell'

enable :sessions, :logging
set :public, File.dirname(__FILE__)

def game
  session[:game] ||= GameOfLife.new
end

def setState(x,y,state)
  game.board[y][x].state = state
end

get '/state' do
  game.board.to_json
end

get '/set/:x/:y' do
  setState params[:y].to_i, params[:x].to_i, true
end

get '/clear/:x/:y' do
  setState params[:y].to_i, params[:x].to_i, false
end

get '/step' do
  game.step
  game.board.to_json
end
