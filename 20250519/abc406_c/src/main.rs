use itertools::Itertools;
use proconio::input;

fn main() {
    input! {
        n: usize,
        p: [usize; n],
    }

    let mut compressed = vec![];
    for w in p.windows(2) {
        if w[0] < w[1] {
            compressed.push('<');
        } else {
            compressed.push('>');
        }
    }

    let rle: Vec<(char, usize)> = compressed
        .into_iter()
        .group_by(|&c| c)
        .into_iter()
        .map(|(c, group)| (c, group.count()))
        .collect();

    let mut ans = 0;
    for w in rle.windows(3) {
        if w[0].0 == '<' && w[1].0 == '>' && w[2].0 == '<' {
            ans += w[0].1 * w[2].1;
        }
    }

    println!("{}", ans);
}
