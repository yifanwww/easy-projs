using System;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;

namespace Easy
{
    class RandomGenerator
    {
        private static String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 \n";
        private static Byte[] charbytes = Encoding.ASCII.GetBytes(chars);

        private RandomNumberGenerator rng = RandomNumberGenerator.Create();

        public String String(Int32 length)
        {
            Byte[] bytes = new Byte[length];
            rng.GetBytes(bytes);
            for (Int32 i = 0; i < length; i++) {
                bytes[i] = charbytes[bytes[i] % 64];
            }
            return Encoding.ASCII.GetString(bytes);
        }
    }

    class Program
    {
        static void Main(String[] args)
        {
            Int32 number = 2_000;
            Int32 length = 1_000_000;
            Double totalSize = 4.0 * length * number / 1024 / 1024;

            var rg = new RandomGenerator();

            // Used for JIT compilation.
            for (Int32 i = 0; i < 10; i++)
                rg.String(length);

            var sw = new Stopwatch();
            sw.Restart();
            for (Int32 i = 0; i < number; i++) {
                rg.String(length);
            }
            sw.Stop();

            Console.WriteLine($"Time:  {sw.Elapsed.TotalSeconds} s");
            Console.WriteLine($"Speed: {totalSize / sw.Elapsed.TotalSeconds} MB/s");
        }
    }
}
