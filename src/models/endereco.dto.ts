import { CidadeDTO } from './cidade.dto';

export interface EnderecoDTO {
    id: string;
    address: string;
    number: string;
    complement: string;
    district: string;
    zipCode: string;
    city: CidadeDTO;
}