class PresidentsController < ApplicationController

  def index
    hash = RetirementsViewObject.new(President.all).get_data

    respond_to do |format|
      format.html { }
      format.json { render json: {names: hash.keys, days: hash.values} }
    end
  end

end
