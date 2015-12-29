class RetirementsViewObject

  def initialize(presidents)
    @presidents = presidents
  end

  # def get_data
  #   @presidents.each_with_object({}) do |president, hash|
  #     hash["(#{president.id}) #{president.name_firstlast}"] = president.retirement_in_days
  #   end
  # end

  def get_data
    data_array = @presidents.each_with_object([]) do |president, array|
      array << [president.id, president.name_firstlast, president.retirement_in_days]
    end
    data_array.reject{|prez| prez[0] == 22}
  end


end
