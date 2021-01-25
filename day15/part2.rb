# frozen_string_literal: true

nums = File.read('./input.txt').split(',').map(&:to_i)

cache = {}

nums.each_with_index do |num, idx|
  cache[num] = [idx]
end

last = nums.last

puts "cache: #{cache}"
puts "last: #{last}"

def cache_add(cache, last, idx)
  if cache.include?(last)
    cache[last] << idx
  else
    cache[last] = [idx]
  end
end

(nums.length...30_000_000).each do |idx|
  # puts "\##{idx + 1}"
  last =
    if cache.include?(last) && cache[last].length >= 2
      cache[last][-1] - cache[last][-2]
    else
      0
    end

  cache_add(cache, last, idx)

  # puts "cache #{cache}"
  # puts "last #{last}"
end

puts last
