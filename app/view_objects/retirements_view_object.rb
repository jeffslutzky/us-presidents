class RetirementsViewObject

  def initialize(presidents)
    @presidents = presidents
  end


  def get_data
    data_array = @presidents.each_with_object([]) do |president, array|
      array << [president.id, president.name_firstlast, president.alive?, president.age_at_inauguration, president.presidency_length, president.retirement_in_days, president.lifespan]
    end
    data_array.reject{|prez| prez[0] == 22}
  end


end
