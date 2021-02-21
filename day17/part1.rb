# frozen_string_literal: true

lines = File
        .read('./input.txt')
        .lines(chomp: true)
        .map(&:chars)

pre = [lines]

6.times do
  # puts 'pre'
  # pp pre

  z_len = pre.length + 2
  y_len = pre[0].length + 2
  x_len = pre[0][0].length + 2

  extended = []
  z_len.times do |z|
    extended[z] = []
    y_len.times do |y|
      extended[z][y] = []
      x_len.times do |x|
        content = if x.zero? ||
                     y.zero? ||
                     z.zero? ||
                     z == z_len - 1 ||
                     y == y_len - 1 ||
                     x == x_len - 1
                    '.'
                  else
                    pre[z - 1][y - 1][x - 1]
                  end

        extended[z][y][x] = content
      end
    end
  end

  pre = extended

  # puts 'extended'
  # pp extended

  find_neighbors = proc do |matrix, z, y, x|
    active_count = 0
    [0, -1, 1].repeated_permutation(3) do |x_s, y_s, z_s|
      next if x_s.zero? && y_s.zero? && z_s.zero?

      x_t = x + x_s
      y_t = y + y_s
      z_t = z + z_s

      next if x_t.negative? || y_t.negative? || z_t.negative? || x_t == x_len || y_t == y_len || z_t == z_len

      active_count += 1 if matrix[z_t][y_t][x_t] == '#'
    end

    active_count
  end

  post = []
  z_len.times do |z|
    post[z] = []
    y_len.times do |y|
      post[z][y] = []
      x_len.times do |x|
        count = find_neighbors.call(extended, z, y, x)
        # puts("#{z}:#{y}:#{x}:#{count}:#{extended[z][y][x]}")
        post[z][y][x] = if extended[z][y][x] == '.' && count == 3
                          '#'
                        elsif extended[z][y][x] == '#' && [3, 2].include?(count)
                          '#'
                        else
                          '.'
                        end
      end
    end
  end
  # puts 'post'
  # pp post

  pre = post
end

count = 0
pre.each do |z_a|
  z_a.each do |y_a|
    y_a.each do |cell|
      count += 1 if cell == '#'
    end
  end
end

puts "count: #{count}"
