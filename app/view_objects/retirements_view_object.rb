class RetirementsViewObject

  def initialize(presidents)
    @presidents = presidents
  end

  def get_data
    @presidents.each_with_object({}) do |president, hash|
      hash[president.name_firstlast] = president.retirement_in_days
    end
  end

  def get_data_sorted
    get_data.sort_by { |k, v| v }.reverse.to_h
  end

end
