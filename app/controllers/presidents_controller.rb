class PresidentsController < ApplicationController

  def index
    array = RetirementsViewObject.new(President.all).get_data

    respond_to do |format|
      format.html { }
      format.json { render json: array }

    end
  end

end
