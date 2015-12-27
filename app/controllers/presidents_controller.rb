class PresidentsController < ApplicationController

  def index
    hash = RetirementsViewObject.new(President.all).get_data
    sorted_hash = RetirementsViewObject.new(President.all).get_data_sorted
    respond_to do |format|
      format.html { }
      format.json { render json: {chronological: {names: hash.keys, days: hash.values}, descending: {names: sorted_hash.keys, days: sorted_hash.values} } }
    end
  end

end
