import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateWishlistDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsUrl()
    readonly image: string;

    @IsNotEmpty()
    readonly itemsId: string[];
}