# frozen_string_literal: true

lines = File
        .read('./input.txt')
        .lines(chomp: true)
        .map(&:chars)

pre = [[lines]]

6.times do
  # puts 'pre'
  # pp pre

  w_len = pre.length + 2
  z_len = pre[0].length + 2
  y_len = pre[0][0].length + 2
  x_len = pre[0][0][0].length + 2

  extended = []
  w_len.times do |w|
    extended[w] = []
    z_len.times do |z|
      extended[w][z] = []
      y_len.times do |y|
        extended[w][z][y] = []
        x_len.times do |x|
          content = if x.zero? ||
                       y.zero? ||
                       z.zero? ||
                       w.zero? ||
                       w == w_len - 1 ||
                       z == z_len - 1 ||
                       y == y_len - 1 ||
                       x == x_len - 1
                      '.'
                    else
                      pre[w - 1][z - 1][y - 1][x - 1]
                    end

          extended[w][z][y][x] = content
        end
      end
    end
  end

  pre = extended

  # puts 'extended'
  # pp extended

  find_neighbors = proc do |matrix, w, z, y, x|
    active_count = 0
    [0, -1, 1].repeated_permutation(4) do |x_s, y_s, z_s, w_s|
      next if x_s.zero? && y_s.zero? && z_s.zero? && w_s.zero?

      x_t = x + x_s
      y_t = y + y_s
      z_t = z + z_s
      w_t = w + w_s

      if x_t.negative? || y_t.negative? || z_t.negative? || w_t.negative? || x_t == x_len || y_t == y_len || z_t == z_len || w_t == w_len
        next
      end

      active_count += 1 if matrix[w_t][z_t][y_t][x_t] == '#'
    end

    active_count
  end

  post = []
  w_len.times do |w|
    post[w] = []
    z_len.times do |z|
      post[w][z] = []
      y_len.times do |y|
        post[w][z][y] = []
        x_len.times do |x|
          count = find_neighbors.call(extended, w, z, y, x)
          # puts("#{w}:#{z}:#{y}:#{x}:#{count}:#{extended[w][z][y][x]}")
          post[w][z][y][x] = if extended[w][z][y][x] == '.' && count == 3
                               '#'
                             elsif extended[w][z][y][x] == '#' && [3, 2].include?(count)
                               '#'
                             else
                               '.'
                             end
        end
      end
    end
  end
  # puts 'post'
  # pp post

  pre = post
end

count = 0
pre.each do |w_a|
  w_a.each do |z_a|
    z_a.each do |y_a|
      y_a.each do |cell|
        count += 1 if cell == '#'
      end
    end
  end
end

puts "count: #{count}"
