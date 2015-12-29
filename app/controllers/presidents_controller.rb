class PresidentsController < ApplicationController

  def index
    # hash = RetirementsViewObject.new(President.all).get_data
    array = RetirementsViewObject.new(President.all).get_data

    respond_to do |format|
      format.html { }
      # format.json { render json: {names: hash.keys, days: hash.values, id: (1..44).to_a } }
      format.json { render json: array }

    end
  end

end
